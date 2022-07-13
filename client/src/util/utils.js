import axios from "axios";
import { animated, useSpring } from 'react-spring';
import React from 'react';

const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export function isDev() {
  return development;
}

export function toDataURL(url) {
  return fetch(url).then(response => response.blob()).then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))
}

export function getCallbackUrl() {
  return isDev() ? "http://localhost:3000" : "https://mc.craig.software";
}

// ===== Internal =====

// Checks if the current user is administrator user.
export function isUserAdmin(user) {
  return user.data.role === "admin";
}

// Returns the details of a logged in user 
export function getUserDetails() {
  return axios.get(isDev() ? 'http://localhost:3001/auth' : "https://mc-be.craig.software/auth", {
    withCredentials: true
  })
}

// ===== Discord =====

// Returns a Discord users profile picture
export function getDiscordAvatar(userId, avatarhash) {
  let exstension = avatarhash.includes('a_') ? '.gif' : '.png';

  return "https://cdn.discordapp.com/avatars/" + userId + "/" + avatarhash + exstension;
}

// ===== Minecraft =====

// Returns boolean indicating if a string is a valid UUID or not 
export function isUuid(uuid) {
  const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return regexExp.test(uuid);
}

// Returns a 2D head of a Minecraft Player from their UUID. Will return default skin head if UUID is not valid.
export function getSkinHead(uuid) {
  if (isUuid(uuid)) {
    return 'https://api.sprax2013.de/mc/skin/' + uuid + '/head?size=64';
  }
  return 'https://api.sprax2013.de/mc/skin/ec561538-f3fd-461d-aff5-086b22154bce/head?size=64';
}

// Returns a Minecraft Players username from their UUID
export function getMinecraftPlayerName(uuid) {
  return fetch('https://playerdb.co/api/player/minecraft/' + uuid).then((response) => response.json())
}

//
export function getMinecraftDetails(url, code) {
  window.location = url + '?mcAuth=' + code;
}

export const Boop = ({ x = 0, y = 0, rotation = 0, scale = 1, timing = 150, children }) => {
  const [isBooped, setIsBooped] = React.useState(false);
  const style = useSpring({
    display: 'flex',
    backfaceVisibility: 'hidden',
    transform: isBooped
      ? `translate(${x}px, ${y}px)
           rotate(${rotation}deg)
           scale(${scale})`
      : `translate(0px, 0px)
           rotate(0deg)
           scale(1)`,
    config: {
      tension: 300,
      friction: 10,
    },
  });
  React.useEffect(() => {
    if (!isBooped) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setIsBooped(false);
    }, timing);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isBooped, timing]);
  const trigger = () => {
    setIsBooped(true);
  };
  return (
    <animated.span onMouseEnter={trigger} style={style}>
      {children}
    </animated.span>
  );
};