import type { FC } from "react";
import { Link } from "react-router-dom";
import { formatPhoneWA } from "../../utils/utils";

// Props
type Props = {
  link: string;
  text: string;
  active: boolean;
};
const TextLink: FC<Props> = ({ link, text, active }) => {
  const nomor = "6285896890881";
  const pesan = encodeURIComponent(
    "Assalamu'alaikum, saya ingin menanyakan informasi terkait pendaftaran di Pondok Pesantren. " +
      "Mohon info mengenai syarat dan prosedurnya. Terima kasih.",
  );

  return (
    <>
      {link === "whatsapp" ? (
        <a
          href={`https://wa.me/${nomor}?text=${pesan}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white font-light md:text-xl lg:text-sm relative before:absolute before:w-full before:h-px before:bg-yellow-300 before:bottom-0 before:left-0 before:origin-left before:scale-x-0 before:transition-all before:duration-300 hover:before:scale-x-100 lg:font-normal"
        >
          {text === "Hubungi Kami" ? "Hubungi Kami" : formatPhoneWA(text)}
        </a>
      ) : active && link !== "whatsapp" ? (
        <Link
          to={`/${link}`}
          className="text-sm text-white font-light md:text-xl lg:text-sm relative before:absolute before:w-full before:h-px before:bg-yellow-300 before:bottom-0 before:left-0 before:origin-left before:scale-x-0 before:transition-all before:duration-300 hover:before:scale-x-100 lg:font-normal"
        >
          {" "}
          {text}
        </Link>
      ) : (
        <Link
          to={`/${link}`}
          className="text-sm text-white font-light md:text-xl lg:text-sm"
        >
          {" "}
          {text}
        </Link>
      )}
    </>
  );
};

export default TextLink;
