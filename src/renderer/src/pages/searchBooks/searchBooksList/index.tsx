import { useParams, useSearchParams } from 'react-router-dom';

function SearchBooksList() {
    const { name: searchBookName } = useParams();
    return <div>{searchBookName}</div>;
}

export default SearchBooksList;
