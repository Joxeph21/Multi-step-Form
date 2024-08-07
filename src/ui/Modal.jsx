function Modal({ children }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-stone-200/50 backdrop-blur-[2px]">
      <div className="space-y-9 rounded-md bg-white px-7 pb-8 pt-3 shadow-xl md:px-8">
        {children}
      </div>
    </div>
  );
}

export default Modal;
