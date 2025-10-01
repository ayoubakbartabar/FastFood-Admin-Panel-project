import React, { useEffect, useState } from "react";
import { fetchFooterData } from "../../types/server/footerApi";
import type { FooterDataProps } from "../../types/server/footerApi";

function FooterPage() {
  const [data, setData] = useState<FooterDataProps | null>(null);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchFooterData();
      if (result) setData(result);
    };
    getData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <footer>
      <h2>{data.company.name}</h2>
      <p>{data.company.description}</p>
      <p>{data.company.address}</p>
      <p>{data.company.phone}</p>
      <p>{data.company.email}</p>

      <ul>
        {data.links.map((link) => (
          <li key={link.id}>
            <a href={link.href}>{link.title}</a>
          </li>
        ))}
      </ul>

      <h3>Working Hours</h3>
      <ul>
        {data.hours.map((h, idx) => (
          <li key={idx}>
            {h.day}: {h.time}
          </li>
        ))}
      </ul>

      <div>
        <input type="email" placeholder={data.newsletter.placeholder} />
        <p>{data.newsletter.description}</p>
      </div>

      <ul>
        {data.social.map((s) => (
          <li key={s.id}>
            <a href={s.href}>{s.platform}</a>
          </li>
        ))}
      </ul>

      <small>{data.copyright}</small>
    </footer>
  );
}

export default FooterPage;
