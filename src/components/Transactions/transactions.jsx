import React, { useContext, useState } from 'react';
import { DataContext } from "../../DataProvider"
import 'bootstrap/dist/css/bootstrap.min.css';
import './transactions.css';
import { Link } from 'react-router-dom';

import dogeUser from '../../assets/imgs/doge-user.jpg';

import {
    Home, Settings, Search,
    Bell, Gift, Receipt, TrendingUp,
    User, Award, ShoppingCart, Phone,
    TrendingDown, LogOut
} from 'lucide-react';

const Transactions = () => {
    const { user, updateBalance, logout } = useContext(DataContext)
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    return (
        <div className="safeBet-app">
            <header className="app-header">
                <div className="header-left">
                    <div className="logo">
                        <div className="logo-circle blue"></div>
                        <div className="logo-circle red"></div>
                        <span className="logo-text">SafeBet Finance</span>
                    </div>
                    <h2 className="page-title">Transactions</h2>
                </div>
                <div className="header-right">
                    <div className="search-container">
                        <Search className="search-icon" size={18} />
                        <input type="text" placeholder="Search for something" className="search-input" />
                    </div>
                    <button className="icon-button">
                        <Settings size={20} />
                    </button>
                    <button className="icon-button notification">
                        <Bell size={20} />
                        <span className="notification-badge"></span>
                    </button>
                    <div className="user-avatar">
                        <img src={dogeUser} alt="User" />
                    </div>
                </div>
            </header>

            <div className="main-container">
                <nav className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
                    <div className="sidebar-toggle" onClick={toggleSidebar}>
                        {sidebarCollapsed ? <span>›</span> : <span>‹</span>}
                    </div>
                    <ul className="nav-links">
                        <li className="nav-item active">
                            <Link to="/dashboard" className="nav-link">
                                <Home size={20} />
                                <span className="nav-text">Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/transactions" className="nav-link">
                                <Receipt size={20} />
                                <span className="nav-text">Transactions</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/accounts" className="nav-link">
                                <User size={20} />
                                <span className="nav-text">Accounts</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/investments" className="nav-link">
                                <TrendingDown size={20} />
                                <span className="nav-text">"Investments"</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/rewards" className="nav-link">
                                <Gift size={20} />
                                <span className="nav-text">Rewards</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/benefits" className="nav-link">
                                <Award size={20} />
                                <span className="nav-text">SafeBet Benefits</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/settings" className="nav-link">
                                <Settings size={20} />
                                <span className="nav-text">Settings</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link" onSubmit={(e) => logout(e)}>
                                <LogOut size={20} />
                                <span className="nav-text">Logout</span>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <main className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>

                    {/* Last Transaction */}
                    <div className="transactions-section">
                        <div className="section-header">
                            <h3>Total Transaction</h3>
                        </div>
                        <div className="transaction-list max-h-[60vh] overflow-y-auto">
                            {/* LOADING TRANSACTION DATA */}
                            {user.history.map((transaction, index) => (
                                <div className="transaction-item" key={index}>
                                    <div className="transaction-left">
                                        <div className="transaction-icon">
                                            <ShoppingCart size={18} />
                                        </div>
                                        <div className="transaction-details">
                                            <div className="transaction-title">{transaction.name}</div>
                                            <div className="transaction-date">25 Jan 2021</div>
                                        </div>
                                    </div>
                                    <div className="transaction-middle">
                                        <div className="transaction-type">Shopping</div>
                                        <div className="transaction-card">1234 ****</div>
                                    </div>
                                    <div className="transaction-right">
                                        <div className="transaction-status">Pending</div>
                                        <div className={`transaction-amount ${transaction.value < 0 ? 'negative' : 'positive'}`}>
                                            {transaction.value < 0 ? '-' : '+'}${Math.abs(transaction.value)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
};

export default Transactions;