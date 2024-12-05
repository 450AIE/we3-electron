import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import { Input } from 'antd';
import { useEffect, useState } from 'react';
import { getBookDetailAPI, getSearchBookListAPI } from '@renderer/apis/searchBooks';
import { Book, BookDetailType } from '../types';
import BookDetail from '../components/BookDetail';
import { flushSync } from 'react-dom';

function SearchBooksList(props) {
    const { name: searchBookName } = props.params;
    // 存储当前请求到的书籍列表的信息
    const [bookInfoList, setBookInfoList] = useState<Book[]>([]);
    // 搜索框输入的文本
    const [inputSearchBookName, setInputSearchBookName] = useState<string>(searchBookName);
    // 当前页
    const [page, setPage] = useState<number>(1);
    // 当前选择的书籍信息
    const [selectedBookInfo, setSelectedBookInfo] = useState<BookDetailType>(null);
    // 控制打开书籍详情
    const [isOpenBookDetail, setIsOpenBookDetail] = useState<boolean>(false);
    async function getSearchBookList(name, page, limit? = 20) {
        const res = await getSearchBookListAPI(name, page, limit);
        setBookInfoList(res.data.list);
    }
    // 一二级路由都展示的时候，一级路由选择的搜索书籍改变就重新请求
    useEffect(() => {
        getSearchBookList(searchBookName, 1);
    }, [searchBookName]);
    async function openBookDetail(e) {
        let dom = e.target;
        if (dom.tagName === 'UL') {
            dom = dom.querySelector('.one-book-info-card');
            const { id } = dom.dataset;
            // 找到对应的书籍信息
            const res = await getBookDetailAPI(id);
            const info = res.data?.info || res.data;
            setSelectedBookInfo(info);
            setIsOpenBookDetail(true);
        } else {
            let times = 0;
            while (![...dom.classList].includes('one-book-info-card')) {
                if (times >= 3) return;
                dom = dom.parentNode;
                times++;
            }
            const { id } = dom.dataset;
            // 找到对应的书籍信息
            const res = await getBookDetailAPI(id);
            const info = res.data?.info || res.data;
            setSelectedBookInfo(info);
            setIsOpenBookDetail(true);
        }
    }
    return (
        <div className={styles.container}>
            <div className="search-inp-box">
                <Input />
            </div>
            <div className="now-show-sum">当前显示的数目: ({bookInfoList?.length})</div>
            {/* 日后需要改为虚拟列表 */}
            <ul className="book-list-box beautify-scrollbar" onClick={openBookDetail}>
                {bookInfoList.map((bookInfo) => (
                    <li
                        className="one-book-info-card"
                        key={bookInfo.book_id}
                        data-id={bookInfo.book_id}
                    >
                        <div className="book-name">{bookInfo.book_name}</div>
                        <div className="book-editor">{bookInfo.author}</div>
                        <div className="book-publisher">{bookInfo.publisher}</div>
                    </li>
                ))}
            </ul>
            <BookDetail
                isOpen={isOpenBookDetail}
                setIsOpen={setIsOpenBookDetail}
                bookDetail={selectedBookInfo}
            />
        </div>
    );
}

export default SearchBooksList;
