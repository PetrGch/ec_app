import React from 'react';
import {Link} from "react-router-dom";

export const commentaryColumnConfig = () => [
  {
    key: "name",
    title: "Company name",
    dataIndex: "name",
    render: (text, record) => (
      <Link to={`/admin/commentary/${record.id}`}>{text}</Link>
    )
  },
  {
    key: "address",
    title: "Address",
    dataIndex: "address"
  },
  {
    key: "createdAt",
    title: "Created at",
    dataIndex: "createdAt"
  },
  {
    key: "updatedAt",
    title: "Updated at",
    dataIndex: "updatedAt",
  }
];

