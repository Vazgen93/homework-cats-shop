const CardItem = (props) => {

    const {
        cat:{ id, email, name },
        transferCatHandle,
        cardType
    } = props;

    return (
        <li className="item" onClick={() => transferCatHandle(id,cardType)}>
            <img src={`https://robohash.org/${id}?set=set4`} alt="cat" className="item__image" />
            <div className="item__header">{name}</div>
            <div>{email}</div>
        </li>
    );
};

export default CardItem;
