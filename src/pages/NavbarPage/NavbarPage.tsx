import React, { useEffect, useState } from "react";
import "./NavbarPage.css";
import { fetchNavbarData } from "../../types/server/navbarApi";
import type { NavbarDataProps } from "../../types/server/navbarApi";

function NavbarPage() {
  const [data, setData] = useState<NavbarDataProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const result = await fetchNavbarData();
        if (result) {
          setData(result);
        } else {
          setError("No data received from API");
        }
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);
  
  console.log(data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="navbar-page">
      <div className="logo">
        {data?.logo.map((img, idx) => (
          <img key={idx} src={img} alt={`Logo ${idx}`} />
        ))}
      </div>

      <ul className="menu">
        {data?.Menu.map((item) => (
          <li key={item.id}>
            <a href={item.href}>{item.title}</a>
          </li>
        ))}
      </ul>

      <ul className="icons">
        {data?.Icon.map((icon) => (
          <li key={icon.id}>{icon.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default NavbarPage;
