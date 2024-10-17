import React from "react";
import format from "date-fns/format";

export default function CustomTable({ data, title, columns }) {
  const findData = (row, key) => {
    const keyArray = key.split(".");
    let data = row[keyArray[0]];
    for (let i = 1; i < keyArray.length; i++) {
      data = data[keyArray[i]];
    }
    return data;
  };

  const truncateText = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "....";
    }
    return text;
  };
  return (
    <div>
      <h4 className="text-center data-list">{title}</h4>
      <table className="table table-striped text-center border">
        <thead>
          <tr>
            {columns.map((column, columnIndex) => (
              <th key={"column-head" + columnIndex}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={"data-" + rowIndex}>
              {columns.map((column, columnIndex) => (
                <td key={"column-cell" + columnIndex}>
                  {column.key === "body" && column.type === "string"
                    ? truncateText(findData(row, column.key), 20)
                    : column.type === "date"
                    ? format(
                        new Date(findData(row, column.key)),
                        "dd MMMM yyyy"
                      )
                    : findData(row, column.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
