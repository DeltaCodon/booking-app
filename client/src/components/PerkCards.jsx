import Wifi from "/wifiIcon.svg";
import Parking from "/parkingIcon.svg";
import Entertainment from "/entertainIcon.svg";
import Pets from "/petsIcon.svg";
import Entrance from "/entranceIcon.svg";
import Kitchen from "/kitchenIcon.svg";
import Stay from "/stayIcon.svg";
import Fireplace from "/fireplaceIcon.svg";
import Smoking from "/smokingIcon.svg";
import Shareing from "/duplexIcon.svg";

const PerkCards = ({ selected, onSelected }) => {
  const perkImgPaths = [
    { name: "Wifi", path: Wifi },
    { name: "Free Parking", path: Parking },
    { name: "Entertainment", path: Entertainment },
    { name: "Pets Allowed", path: Pets },
    { name: "Private Entrance", path: Entrance },
    { name: "Kitchen Included", path: Kitchen },
    { name: "Extended Stay", path: Stay },
    { name: "Fireplace", path: Fireplace },
    { name: "Smoking", path: Smoking },
    { name: "Shared Space", path: Shareing },
  ];

  function handleCheckboxClick(ev) {
    const { checked, name } = ev.target;
    if (checked) {
      onSelected([...selected, name]);
    } else {
      onSelected([...selected.filter((selectedName) => selectedName !== name)]);
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid md:grid-cols-4 lg:grid-cols-4 border mt-2 p-4 gap-2">
      {perkImgPaths.map((checkboxes) => {
        return (
          <label
            key={checkboxes.name}
            htmlFor={checkboxes.name}
            className="flex text-sm bg-white border border-themeBlue py-4 px-1 rounded-xl items-center gap-2 has-[:checked]:border-themeGold shadow-lg has-[:checked]:shadow-none has-[:checked]:bg-slate-50 cursor-pointer"
          >
            <input
              id={checkboxes.name}
              type="checkbox"
              className="ml-2 checked:accent-themeGold checked:text-white border-black checked:rounded focus:ring-themeBlue"
              checked={selected.includes(checkboxes.name)}
              name={checkboxes.name}
              onChange={handleCheckboxClick}
            />
            <img src={checkboxes.path} width={27} />
            <span className="">{checkboxes.name}</span>
            <br />
          </label>
        );
      })}
    </div>
  );
};

export default PerkCards;
