import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import { Input } from 'antd';
import { useEffect, useState } from 'react';
import { getSearchBookListAPI } from '@renderer/apis/searchBooks';

function SearchBooksList(props) {
    const { name: searchBookName } = props.params;
    // 存储当前请求到的书籍列表的信息
    const [bookInfoList, setBookInfoList] = useState([]);
    // 搜索框输入的文本
    const [inputSearchBookName, setInputSearchBookName] = useState<string>(searchBookName);
    useEffect(() => {
        async function getSearchBookList() {
            const res = await getSearchBookListAPI(inputSearchBookName, 1, 20);
            console.log(res);
        }
        getSearchBookList();
    }, []);
    return (
        <div className={styles.container}>
            <div className="search-inp-box">
                <Input />
            </div>
            <div className="now-show-sum">当前显示的数目</div>
            <div className="virtual-book-list"></div>
        </div>
    );
}

export default SearchBooksList;
