import axios from "axios";

async function fetchData() {
  try {
    const response = await axios.get(
      "https://api.quicksell.co/v1/internal/frontend-assignment"
    );
    // console.log(response.data.ticket)
    const items = response.data.tickets;
    const users = response.data.users;

    const status = ["Backlog", "Todo", "In progress", "Done", "Cancelled"].map(
      (e) => ({
        title: e,
        tickets: items.filter((item) => item.status === e),
      })
    );
    

    const user = users.map((e) => ({
      title: e.name,
      tickets: items.filter((item) => item.userId === e.id),
    }));

    const priority = [
      { priority: "No priority", level: 0 },
      { priority: "Low", level: 1 },
      { priority: "Medium", level: 2 },
      { priority: "High", level: 3 },
      { priority: "Urgent", level: 4 },
    ].map((e) => ({
      title: e.priority,
      tickets: items.filter((item) => item.priority === e.level),
    }));

    return { status, user, priority, users };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { status: [], user: [], priority: [], users: [] };
  }
}

export default fetchData;
