import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase.config";

export const filters = [
  { id: 2, name: "Lyric", value: "lyric" },
  { id: 3, name: "Guitar", value: "guitar" },
  { id: 4, name: "Melody", value: "melody" },
  { id: 5, name: "Lo-Fi", value: "lofi" },
];

export const filterByLanguage = [
  { id: 1, name: "C major/Am", value: "C major/Am" },
  { id: 2, name: "C#/A#m", value: "C#/A#m" },
  { id: 3, name: "D/Bm", value: "Bm" },
  { id: 4, name: "D#/Cm", value: "D#/Cm" },
  { id: 5, name: "E/C#m", value: "E/C#m" },
  { id: 6, name: "F/Dm", value: "F/Dm" },
  { id: 7, name: "F#/D#m", value: "F#/D#m" },
  { id: 8, name: "G/Em", value: "G/Em" },
  { id: 9, name: "G#/Fm", value: "G#/Fm" },
  { id: 10, name: "A/F#m", value: "A/F#m" },
  { id: 11, name: "A#/Gm", value: "A#/Gm" },
  { id: 12, name: "B/G#m", value: "B/G#m" },
];

export const deleteAnObject = (referenceUrl) => {
  const deleteRef = ref(storage, referenceUrl);
  deleteObject(deleteRef)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};
