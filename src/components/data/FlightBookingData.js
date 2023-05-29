export const FlightBookingData = [
  {
    fromWhere: "Canada",
    toWhere: "Germany",
    LeavingOn:new Date().toISOString().slice(0,10),
    returningOn: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0,10),
    image:
      "https://images.pexels.com/photos/104826/aircraft-holiday-sun-tourism-104826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: 2,
      type: "flight",
      passanger: 1,
      flightType: "Economy"
  },
  {
    fromWhere: "Lagos",
    toWhere: "London",
    LeavingOn:new Date().toISOString().slice(0,10),
    returningOn: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().slice(0,10),
    image:
      "https://images.pexels.com/photos/358220/pexels-photo-358220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: 2,
      type: "flight",
      passanger: 1,
      flightType: "Business"
  },
  {
    fromWhere: "Johannesburg (JNB)",
    toWhere: "Houston (IAH)",
    LeavingOn:new Date().toISOString().slice(0,10),
    returningOn: new Date(new Date().setDate(new Date().getDate() + 4)).toISOString().slice(0,10),
    image:
      "https://images.pexels.com/photos/321159/pexels-photo-321159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: 2,
      type: "flight",
      passanger: 1,
      flightType: "Premium economy"
  },
  {
    fromWhere: "Dubai  (DXB)",
    toWhere: "New York (JFK)",
    LeavingOn:new Date().toISOString().slice(0,10),
    returningOn: new Date(new Date().setDate(new Date().getDate() + 4)).toISOString().slice(0,10),
    image:
      "https://images.pexels.com/photos/316794/pexels-photo-316794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: 2,
      type: "flight",
      passanger: 1,
      flightType: "First class"
  },
  {
    fromWhere: "Port Harcourt  (PHC)",
    toWhere: "Nairobi  (NBO)",
    LeavingOn:new Date().toISOString().slice(0,10),
    returningOn: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().slice(0,10),
    image:
      "https://images.pexels.com/photos/113585/pexels-photo-113585.jpeg?auto=compress&cs=tinysrgb&w=800",
      price: 2,
      type: "flight",
      passanger: 1,
      flightType: "Economy"
  },
  {
    fromWhere: "Canada",
    toWhere: "Russia",
    LeavingOn:new Date().toISOString().slice(0,10),
    returningOn: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString().slice(0,10),
    image:
      "https://images.pexels.com/photos/1098745/pexels-photo-1098745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      price: 2,
      type: "flight",
      passanger: 1,
      flightType: "Economy"
  },
];
