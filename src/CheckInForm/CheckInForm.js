import React, { useState } from "react";
import BasicInfoForm from "../BasicInfoForm/BasicInfoForm";
import NeedsForm from "../NeedsForm/NeedsForm";
import EmergencyContactForm from "../EmergencyContactForm/EmergencyContactForm";
import { postNewUser, postNeeds, postEmergencyContacts } from "../apiCalls/apiCalls";
import "./CheckInForm.css";

const CheckInForm = ({ reliefCenter }) => {
  const [personName, setPersonName] = useState("");
  const [personAge, setPersonAge] = useState("");
  const [personPhone, setPersonPhone] = useState("");
  const [neededItems, setNeededItems] = useState([])
  const [items, setItems] = useState([
    "Diapers",
    "Baby Wipes",
    "Breastfeeding Supplies",
    "Infant Formula",
    "Feminine Products",
    "Phone Charger (iphone)",
    "Phone Charger (android)",
    "add item"
  ]);

  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [emergencyRelationship, setEmergencyRelationship] = useState("");
  const [sendMessage, setSendMessage] = useState(false)

  const submitUser = async e => {
    e.preventDefault();
    const personData = {
      name: personName,
      age: personAge,
      phone: personPhone,
      needs: items,
      emergencyName: emergencyName,
      emergencyPhone: emergencyPhone,
      emergencyRelationship: emergencyRelationship,
      notify: sendMessage
    };
    let userId = await postNewUser(personData, reliefCenter);

    await postNeeds(userId, neededItems)
    await postEmergencyContacts(userId, personData)
  };

  return (
    <section className="CheckInForm">
      <BasicInfoForm
        personName={personName}
        setPersonName={setPersonName}
        personAge={personAge}
        setPersonAge={setPersonAge}
        personPhone={personPhone}
        setPersonPhone={setPersonPhone}
      />
      <NeedsForm items={items} setItems={setItems} neededItems={neededItems} setNeededItems={setNeededItems} />
      <EmergencyContactForm
        emergencyName={emergencyName}
        setEmergencyName={setEmergencyName}
        emergencyPhone={emergencyPhone}
        setEmergencyPhone={setEmergencyPhone}
        emergencyRelationship={emergencyRelationship}
        setEmergencyRelationship={setEmergencyRelationship}
        sendMessage={sendMessage}
        setSendMessage={setSendMessage}
      />
        <button id="submit" onClick={submitUser}>Submit</button>
    </section>
  );
};

export default CheckInForm;
