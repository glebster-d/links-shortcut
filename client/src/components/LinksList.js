import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function LinksList({ links }) {
  if (!links.length) {
    return <p className="center">No links yet!</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nº</th>
          <th>Original</th>
          <th>Cutted</th>
          <th>Open</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, index) => {
          return (
            <tr key={link._id}>
              <td>{index + 1}</td>
              <td>{link.from}</td>
              <td>{link.to}</td>
              <td>
                <Link to={`/detail/${link._id}`}>Open</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

LinksList.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export { LinksList };
