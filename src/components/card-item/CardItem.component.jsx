const CardItem = (props) => {
    //TODO ->>> for review
    // const deleteCatHandle = props.deleteCatHandle;
    // const cat = props.cat;
    const { deleteCatHandle, cat,buttonDelete,addSelectedCat } = props;

    // const id = cat.id
    // const email = cat.email
    // const name = cat.name
    const { id, email, name } = cat;

    return (
        <li className="item" onClick={() => addSelectedCat &&  addSelectedCat(id)}>
            {
                buttonDelete &&
                <div  className="item__delete">
                    <button onClick={() => deleteCatHandle && deleteCatHandle(id)}>&#215;</button>
                </div>
            }

            <img src={`https://robohash.org/${id}?set=set4`} alt="cat" className="item__image" />
            <div className="item__header">{name}</div>
            <div>{email}</div>
        </li>
    );
};

export default CardItem;
