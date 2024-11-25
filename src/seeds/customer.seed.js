import Customer from "../models/customer.model.js";

export async function loadClients() {
    const customers = [
        {
          firstName: "Juan",
          secondName: "Felipe",
          firstlastName: "Costa",
          secondlastName: "Pérez",
          address: "Calle 123 #45-67, Bogotá, Colombia",
          birth: new Date("1990-05-10"),
          cellphone: "310-123-4567",
          email: "juan.costa@gmail.com",
          category: "Regular",
        },
        {
          firstName: "Ana",
          secondName: "María",
          firstlastName: "Gómez",
          secondlastName: "Torres",
          address: "Carrera 56 #78-90, Medellín, Colombia",
          birth: new Date("1988-08-15"),
          cellphone: "311-987-6543",
          email: "ana.gomez@gmail.com",
          category: "Frecuente",
        },
        {
          firstName: "Carlos",
          secondName: "Eduardo",
          firstlastName: "Vargas",
          secondlastName: "García",
          address: "Avenida 34 #23-45, Cali, Colombia",
          birth: new Date("1995-11-20"),
          cellphone: "314-555-1234",
          email: "carlos.vargas@gmail.com",
          category: "Ocasional",
        },
        {
          firstName: "María",
          secondName: "Fernanda",
          firstlastName: "López",
          secondlastName: "Sánchez",
          address: "Calle 88 #12-34, Barranquilla, Colombia",
          birth: new Date("1982-03-25"),
          cellphone: "315-444-5555",
          email: "maria.lopez@gmail.com",
          category: "Regular",
        },
      ];

  try {
    const existingEmails = [];
    const newCustomers = [];

    for (const customer of customers) {
      const existingCustomer = await Customer.findOne({ email: customer.email });
      if (existingCustomer) {
        existingEmails.push(customer.email);
      } else {
        newCustomers.push(customer);
      }
    }

    if (existingEmails.length > 0) {
      console.log("Ya existen los siguientes clientes:", existingEmails.join(", "));
    }

    if (newCustomers.length > 0) {
      await Customer.insertMany(newCustomers);
      console.log("Clientes agregados:", newCustomers.length);
    } else {
      console.log("No se agregaron nuevos clientes");
    }

  } catch (error) {
    console.log("Hubo un error al agregar clientes:", error.message);
  }
}
