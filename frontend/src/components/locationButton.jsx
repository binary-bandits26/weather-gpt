import locationSvg from "../assets/logos/location.svg";

function LocationButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl bg-white/5 border border-white/10 px-4 py-4 flex items-center justify-center transition-colors duration-200 hover:bg-white/10 cursor-pointer"
    >
      <img src={locationSvg} alt="location" className="w-5 h-5" />
    </button>
  );
}

export default LocationButton;
