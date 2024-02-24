import { useDispatch } from "react-redux";
import filtersSlice from "../../redux-toolkit/filterSlice";
const categories = [
    {
        name: 'All',
        value: 'All'
    },
    {
        name: 'Trà sữa',
        value: 'ts'
    },
    {
        name: 'Rau má',
        value: 'rm'
    },
    {
        name: 'Sinh tố',
        value: 'st'
    },
    {
        name: 'Nước ép',
        value: 'ne'
    },
    {
        name: 'Cafe',
        value: 'cf'
    },
]
function Slidebar() {
    const dispatch = useDispatch()
    return (
        <div className="d-flex flex-column">
            <h5>Danh sách</h5>
            <ul className="list-group">
                {
                    categories?.map((item, index) => (
                        <li key={index}
                            className="list-group-item"
                            role="button"
                            id={`item_${index}`}
                            onClick={() => dispatch(filtersSlice.actions.searchCategory(item.value))}
                        >
                            {item.name}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
export default Slidebar





