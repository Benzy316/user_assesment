import React, { useEffect, useState } from "react";
import { Table, Input } from "antd";

function App() {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // Fetch the list of users from your API database
    // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
    fetch("http://localhost:3000/api/v1/getAllUsers")
      .then((response) => response.json())
      .then((data) => setUsers(data.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Define the columns for the table
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "",
      key: "name",
      render: (_, record) => {
        return <p>{record.name?.firstname + " " + record.name?.lastname}</p>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "",
      key: "street",
      render: (_, record) => {
        return <p>{record.address?.street + ", " + record.address?.city}</p>;
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    // Add more columns as needed
  ];

  // Filter the users based on the search text
  const filteredUsers = users.filter((user) => {
    if (searchText) {
      return (
        user.name?.firstname
          ?.toLowerCase()
          .includes(searchText.toLowerCase()) ||
        user.name?.lastname?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.address?.street
          ?.toLowerCase()
          .includes(searchText.toLowerCase()) ||
        user.address?.city?.toLowerCase().includes(searchText.toLowerCase())
      );
    } else {
      return user;
    }
  });

  return (
    <div className="p-4">
      {/* Search input */}
      <Input
        placeholder="Search by name"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="mb-4"
      />

      {/* User table */}
      <Table
        dataSource={filteredUsers}
        pagination={{ pageSize: 5 }}
        columns={columns}
      />
    </div>
  );
}

export default App;
