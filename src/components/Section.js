export default function Selection({ title, data, classOne, classTwo }) {
  return (
    <div className={`about-section ${classOne}`}>
      <h4>{title}</h4>
      <div className="">
        {Array.isArray(data) ? (
          data?.map((el, i, arr) => (
            <span className={classTwo} key={el.id}>
              {i == arr.length - 1 ? el.name : el.name + ","}
            </span>
          ))
        ) : (
          <span className={classTwo}>{data}</span>
        )}
      </div>
    </div>
  );
}
