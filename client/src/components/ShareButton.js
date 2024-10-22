import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const ShareButton = ({ title, description, url }) => {
  const handleShare = (platform) => {
    let shareLink = "";

    switch (platform) {
      case "whatsapp":
        shareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`;
        break;
      default:
        return;
    }

    window.open(shareLink, "_blank");
  };

  return (
    <div>
      <div onClick={() => handleShare("whatsapp")}>
        <FontAwesomeIcon icon={faWhatsapp} size="2x" />
      </div>
    </div>
  );
};

export default ShareButton;
