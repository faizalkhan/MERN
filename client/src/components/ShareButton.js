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
      <div onClick={() => handleShare("whatsapp")}  style={{
          display: "inline-block",
          backgroundColor: "#3F51B5", // WhatsApp color
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "5px",
          textDecoration: "none",
        }}>
        <FontAwesomeIcon icon={faWhatsapp} size="2x" /> Share
      </div>
    </div>
  );
};

export default ShareButton;
