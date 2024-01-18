---
title: 'Architecting Asynchronous State Synchronisation between Backend Services'
date: '2023-12-09'
coverImage: https://images.unsplash.com/photo-1520923642038-b4259acecbd7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&dl=annie-spratt-goholCAVTRs-unsplash.jpg&w=1920
coverImageCaption: Photo by [Annie Spratt](https://unsplash.com/@anniespratt) on Unsplash
tags:
  - microservices
  - system-design
  - architecture
  - backend
---

In the realm of system design and architecture, how backend services communicate with each other hold the key to delivering seamless functionality to users. Internally within a company, this can be done through shared databases, remote procedure calls, or queue messaging systems.

However, providing functionality often involves tapping into external services provided by other companies. A prime example is the use of payment acceptance endpoints, typically APIs accessible over HTTPS, offered by payment service providers (PSPs). PayPal, Adyen, and Stripe are some examples of PSPs which require API consumers to talk to their services through the APIs they provide.

But how do we ensure this communication remains robust, even in the face of faults, timeouts or downtime? Designing APIs and communication streams effectively becomes crucial, especially in cases where speed is of utmost importance because it affects the experience of the users of the system. For this discussion, let's consider several things:

- endpoint: a specific place where a web service can both receive requests and respond
- resource: data which we want to perform actions upon, for example a hotel booking
- state: there may be a number of state which the resource is currently in. The actions and their statuses govern the possible transitions between states.
- action: the act of doing something on a resource, for example creating a hotel booking
- status: the current result of the action on a resource - typically there are 3 statuses for each action - pending, success and failed.

In the internet experience of today, we expect webpages to load within the order of 500ms, and websites to be stay responsive to human interactions. However, not all actions can complete within seconds, and sometimes it may even take longer than stipulated connection time limits set along the communication chain. We wouldn't want to hit a timeout error and be left hanging wondering whether the action was completed successfully or not. As service providers, setting up endpoints requires thoughtful planning.

## Restaurant Booking Service Example

Let's take the scenario of designing a restaurant booking service as an example with the following requirements:

- resource: the resource here is a single restaurant booking
- action: actions on the resource can include: create, cancel, update

The states of the booking resource can be something like this:

<center>
<img src="/assets/fsm.drawio.svg" style="width: 50%; min-width: 500px" />
</center>

Time to time, service consumers may send in requests via the `PUT /booking/{bookingCode}` endpoint to create a booking:

<center>
<img src="/assets/seq01.drawio.svg" style="width: 50%; min-width: 500px" />
</center>

Let's say the service level agreement was for the create booking endpoint to return a status within 5 seconds. If a final status was reached within 5 seconds, the response of the create action from the booking service would tell whether the creation was a success or whether it failed.

If the booking creation takes longer than 5 seconds, then the booking service can respond with a "pending" status of the "create" action. Subsequently, the upstream services can retry sending the request again. The `bookingCode` would then serve as an idempotency key, and would ensure that no duplicates of the booking resources would be created from multiple instances of the same request identified by the `bookingCode`.

## Getting Details about the Resource

Another way that upstream services can learn about the current state of the resource is to ask booking service at the `GET /booking/{bookingCode}` endpoint about the current state about the resource.

<center>
<img src="/assets/seq02.drawio.svg" style="width: 50%; min-width: 500px" />
</center>

When and how frequent to poll the endpoint is a key design consideration when building the services.

## Providing Latest Knowledge About Resource to Upstream

To also ensure timely updates on status changes, a callback or webhook design can be factored into the design. This setup facilitates communication on state changes on the resource back to the service consumer, essentially providing a downstream to upstream synchronization of data. This allows information exchange between your service and the service consumer, even if either one party faces a temporary downtime.

In the FSM above, you probably noticed that there's a transition defined from the `ready` state to `archived` when the date of the booking is one day before the current date/time. Perhaps there is a background task that would clean up all bookings in the previous day and move them from `ready` state to `archived`.

In such scenario, the upstream services wouldn't know about the state change, unless the booking service provides an update in the form of a callback.

<center>
<img src="/assets/seq03.drawio.svg" style="width: 50%; min-width: 500px" />
</center>

This robust setup ensures that regardless of any temporary hiccups in communication, crucial information about actions like creating a booking can still be transferred between service provider and consumer when services are back online. The design isn't just about making things work — it's about making sure they work reliably.
