type props = {
  label: string;
  onClick: Function;
};
const PrimaryButton: React.FC<props> = ({ label, onClick }) => {
  return (
    <button
      onClick={() => onClick()}
      className="ml-auto px-3 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
