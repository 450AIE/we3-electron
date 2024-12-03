import { Button, Input, Modal } from 'antd';
import styles from './index.module.scss';
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getBorrowBooksRankListAPI, getSearchBookHotListAPI } from '@renderer/apis/searchBooks';
import { Book } from './types';

function SearchBooks(props) {
    const { navigate } = props;
    // 热门搜索图书列表
    const [hotSearchBookList, setHotSearchBookList] = useState<string[]>([]);
    // 借阅图书排名列表，借阅排名点击可以直接显示详情，所以保存全部信息
    const [borrowBookRankList, setBorrowBookRankList] = useState<Book[]>([]);
    // 搜索历史列表
    const [searchBookHistoryList, setSearchBookHistoryList] = useState<string[]>([]);
    // 确定栏
    const [isOpenConfirmBox, setIsOpenConfirmBox] = useState<boolean>(false);
    // 选中的书籍名称
    const [selectedBookName, setSelectedBookName] = useState<string>('');
    useEffect(() => {
        async function getHotSearchBookList() {
            const res = await getSearchBookHotListAPI();
            // console.log('hot', res);
            setHotSearchBookList(res.data.book_names);
        }
        async function getBorrowBookRankList() {
            const res = await getBorrowBooksRankListAPI();
            // console.log('borrow', res);
            setBorrowBookRankList(res.data.books.slice(0, 15));
        }
        getHotSearchBookList();
        getBorrowBookRankList();
    }, []);
    function openHotSearchConfirmBox(e) {
        let dom = e.target;
        if (![...dom.classList].includes('one-item')) return;
        const bookName = dom.textContent;
        setIsOpenConfirmBox(true);
        setSelectedBookName(bookName);
    }
    function confirmSearchHotBook() {
        // const searchParams = encodeURIComponent(selectedBookName);
        const searchParams = selectedBookName;
        // console.log(searchParams);
        navigate(`/searchBooks/bookList/${searchParams}`);
        // navigate(`/searchBooks/bookList`);
        setIsOpenConfirmBox(false);
    }
    return (
        <div className={styles.container}>
            <div className="search-top-logo">
                <img src="https://minio.cqupt.edu.cn/wecqupt/common/booksearch.png" alt="" />
            </div>
            <div className="search-inp-box">
                <Input placeholder="搜索" prefix={<SearchOutlined />} className="search-inp" />
            </div>
            <div className="search-history">
                <div className="title-box">
                    <span>搜索历史</span>
                    <span className="icon"></span>
                </div>
                <ul className="content">暂无</ul>
            </div>
            <div className="hot-search">
                <div className="title-box">
                    <span>热门搜索</span>
                </div>
                <ul className="content" onClick={openHotSearchConfirmBox}>
                    {hotSearchBookList?.length &&
                        hotSearchBookList.map((book) => (
                            <li className="one-item" key={book}>
                                {book}
                            </li>
                        ))}
                </ul>
            </div>
            <div className="search-rank">
                <div className="title-box">
                    <span>借阅排名</span>
                    <span className="icon"></span>
                </div>
                <ul className="content">
                    {borrowBookRankList?.length &&
                        borrowBookRankList.map((book) => (
                            <li className="one-item">{book.book_name}</li>
                        ))}
                </ul>
            </div>
            <div className="search-bottom-logo">
                <img src="https://minio.cqupt.edu.cn/wecqupt/common/booksearchbg.png" alt="" />
            </div>
            <Modal
                className="confirm-box"
                open={isOpenConfirmBox}
                maskClosable
                closable={false}
                onCancel={() => setIsOpenConfirmBox(false)}
                getContainer={false}
                footer={null}
                centered
            >
                <div className="confirm-box-content">
                    是否要查找
                    <span style={{ color: '#6fda9a', marginLeft: '10px' }}>{selectedBookName}</span>
                </div>
                <div className="footer">
                    <Button className="cancel-btn" onClick={() => setIsOpenConfirmBox(false)}>
                        取消
                    </Button>
                    <Button className="confirm-btn" onClick={confirmSearchHotBook}>
                        确定
                    </Button>
                </div>
            </Modal>
        </div>
    );
}

export default SearchBooks;
