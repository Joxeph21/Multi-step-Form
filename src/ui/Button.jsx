function Button({ children, type, color, onClick, disabled, addStyle }) {
  const base =
    "cursor-pointer px-3 py-2 transition-all duration-100 text-sm disabled:cursor-not-allowed";
   
  const styles = {
    primary:
      base + ` rounded-sm bg-[#4A3AFF]  text-stone-50 ${addStyle} hover:bg-[#4032da] focus:bg-blue-600  disabled:bg-[#4A3AFF]/40 md:text-base`,
    authenticator:
      base +
      " bg-white border shadow-lg shadow-stone-300/20 rounded-md hover:bg-stone-100  text-left disabled:bg-stone-100 disabled:text-stone-400",
  };

  if (type === "link")
    return (
      <button onClick={onClick} disabled={disabled} className={`text-xs capitalize font-medium ${color} cursor-pointer disabled:cursor-not-allowed`}>{children}</button>
    );

  return (
    <button disabled={disabled} onClick={onClick} className={styles[type]}>
      {children}</button>
  );
}

export default Button;
