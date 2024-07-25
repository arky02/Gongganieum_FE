const RequiredStar = (props: { className?: string }) => {
  const { className } = props;
  return <span className={`text-16 text-red ${className}`}>*</span>;
};

export default RequiredStar;
