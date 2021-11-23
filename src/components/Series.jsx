const Series = ({
    name,
    thumbnail,
    description,
    index,
}) => {
    return (
        <div key={thumbnail.path} className="item">
            <img src={`${thumbnail.path}.${thumbnail.extension}`} className="profile" alt=""/>
            
            <span className="desc">
                <p><strong>{name}</strong></p>
                {description}
            </span>
        </div>
    );
};

export default Series;