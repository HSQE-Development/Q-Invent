import "./loader.css";

export default function AppLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="loader">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </div>
  );
}
