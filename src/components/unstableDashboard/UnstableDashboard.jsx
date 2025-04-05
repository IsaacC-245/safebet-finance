import React, { useState, useRef, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./unstableDashboard.css";
import { Link } from "react-router-dom";
import RouletteSpinner from "../spinner/rouletteSpinner";
import Stocks from "../Stocks";

import dogeUser from "../../assets/imgs/doge-user.jpg";

import {
  Home,
  Settings,
  Search,
  Bell,
  Gift,
  Receipt,
  TrendingUp,
  User,
  Award,
  ShoppingCart,
  Phone,
  TrendingDown,
  LogOut,
  Landmark,
  Club,
  Bitcoin,
  WalletMinimal,
  Vault, SpeakerIcon,
} from "lucide-react";
import {DataContext} from "../../DataProvider";
import Modal from "../Modal";
import CoinFlipGame from "../coinflip/CoinFlipGame";
import HoverAudio from "../HoverAudio";

const UnstableDashboard = () => {
  const { logout } = useContext(DataContext)
  const { user, updateBalance } = useContext(DataContext)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isModalopen, setModalOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);
  const [lastResult, setLastResult] = useState(null);
  const audioRef = useRef(null);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const enableAudio = () => {
    setAudioEnabled(true);
  };

  const handleFlipResult = (didWin) => {
    setLastResult(false);
    if (didWin) {
      updateBalance("Deposit Doubled!", depositAmount*2, user);
    } else {
    }
  };

  const handleDepositAttempt = () => {
    setLastResult(null)
    if(depositAmount > 0){
      setModalOpen(true)
    }
  };

  const handleDeposit = () => {
    if(lastResult==null){
      updateBalance("Deposit", depositAmount, user);
    }
  };

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
          <h2 className="page-title">DashBoard</h2>
        </div>
        <div className="header-right">
          <div className="search-container">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search for something"
              className="search-input"
            />
          </div>
          <button className="icon-button">
            <Settings size={20} />
          </button>
          {!audioEnabled && (
              <button onClick={enableAudio} className="icon-button notification">
                <SpeakerIcon size={20} />
              </button>
          )}
          <div className="user-avatar">
            <img src={dogeUser} alt="User" />
          </div>
        </div>
      </header>

      <div className="main-container">
        <nav className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
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

        <main className={`main-content ${sidebarCollapsed ? "expanded" : ""}`}>
          <div className="container-fluid">
            <div className="row">
              {/* Left Column */}
              <div className="col-md-6">
                {/* Row 1: Finance Cards for Checking & Savings */}
                <div className="row mb-3">
                  <div className="col-12">
                    <div className="financial-overview">
                      {/* Reworked finance cards for Checking and Savings */}
                      <div className="finance-card">
                        <div className="finance-icon blue">
                          <WalletMinimal size={30} />
                        </div>
                        <div className="finance-details">
                          <div className="finance-label">Checking</div>
                          <div className="finance-amount">${user.balance}</div>
                        </div>
                      </div>
                      <div className="finance-card">
                        <div className="finance-icon blue">
                          <Vault size={30} />
                        </div>
                        <div className="finance-details">
                          <div className="finance-label">Savings</div>
                          <div className="finance-amount">$35,183</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 2: Recent Transactions with Deposit Button */}
                <div className="row mb-3">
                  <div className="col-12">
                    <div className="transactions-section">
                      <div className="section-header">
                        <h3>Recent Earnings!!</h3>
                        <div className="finance-details">
                          <div className="finance-label">Deposit</div>
                          <div className="finance-amount-input">
                            <input
                                type="number"
                                defaultValue={0}
                                className="amount-input"
                                onChange={(e) => setDepositAmount(e.target.value)}
                            />
                            <button className="update-button" onClick={handleDepositAttempt}>Deposit</button>
                          </div>

                          {isModalopen && (
                              <Modal onClose={() => {
                                setModalOpen(false);
                                handleDeposit(); // Replace this with whatever function you want to run
                              }}>
                                <h2>DOUBLE NOW</h2>
                                <p>With just a click deposit {depositAmount*2}!</p>
                                <CoinFlipGame onResult={handleFlipResult} />
                              </Modal>
                          )}
                        </div>
                      </div>
                      <div className="transaction-list">
                        <div className="transaction-item">
                          <div className="transaction-left">
                            <div className="transaction-icon">
                              <Landmark size={18} />
                            </div>
                            <div className="transaction-details">
                              <div className="transaction-title">
                                Tax Returns
                              </div>
                              <div className="transaction-date">
                                2 April 2025
                              </div>
                            </div>
                          </div>
                          <div className="transaction-middle">
                            <div className="transaction-type">
                              Gambling Funds from IRS?
                            </div>
                            <div className="transaction-card">1234 ****</div>
                          </div>
                          <div className="transaction-right">
                            <div className="transaction-status">
                              Pending (as always)
                            </div>
                            <div className="transaction-amount positive">
                              $3,000
                            </div>
                          </div>
                        </div>
                        <div className="transaction-item">
                          <div className="transaction-left">
                            <div className="transaction-icon">
                              <Bitcoin size={18} />
                            </div>
                            <div className="transaction-details">
                              <div className="transaction-title">
                                DOGE Team Intern
                              </div>
                              <div className="transaction-date">
                                1 April 2025
                              </div>
                            </div>
                          </div>
                          <div className="transaction-middle">
                            <div className="transaction-type">
                              Straight from the US Treasury
                            </div>
                            <div className="transaction-card">8933 ****</div>
                          </div>
                          <div className="transaction-right">
                            <div className="transaction-status">Classified</div>
                            <div className="transaction-amount positive">
                              $420.69
                            </div>
                          </div>
                        </div>
                        <div className="transaction-item">
                          <div className="transaction-left">
                            <div className="transaction-icon">
                              <Club size={18} />
                            </div>
                            <div className="transaction-details">
                              <div className="transaction-title">
                                BlackJack Winnings
                              </div>
                              <div className="transaction-date">
                                30 March 2025
                              </div>
                            </div>
                          </div>
                          <div className="transaction-middle">
                            <div className="transaction-type">
                              Imagine if you went all in on black tho? &#128064;
                            </div>
                            <div className="transaction-card">1738 ****</div>
                          </div>
                          <div className="transaction-right">
                            <div className="transaction-status">Approved</div>
                            <div className="transaction-amount positive">
                              $2,500
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Row 3: Charts for Savings Interest & Stock Investments */}
                <div className="row">
                  <div className="col-12">
                    <div className="chart-container chart-cards">
                      <div className="col-md-6">
                        <div className="chart-card">
                          <div className="card-header">
                            <h3>Savings</h3>
                          </div>
                          <div className="card-body">
                            <p>Account Over Time</p>
                            <p>APY: 2.5%</p>
                            <div className="chart-placeholder">
                              {/* Insert Savings Chart Component Here */}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Stocks Card */}
                      <div className="col-md-6">
                        <div className="chart-card">
                          <div className="card-header">
                            <h3>Stock Portfolio</h3>
                          </div>
                          <div className="card-body">
                            <p>Earnings/Losses: +$1,200 / -$300</p>
                            <div className="chart-placeholder">
                              <Stocks />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-md-6">
                {/* Row 1: Potential Winnings */}
                <HoverAudio src="/winning.mp3" enabled={audioEnabled}>
                  <div className="row mb-3">
                    <div className="col-12">
                      <div className="winnings-section">
                        <h3>Potential Winnings</h3>
                        {/* Display potential winnings based on recent wins */}
                      </div>
                    </div>
                  </div>
                </HoverAudio>


                <HoverAudio src="/gambling.mp3" enabled={audioEnabled}>
                  {/* Row 2: Spinning Roulette Wheel */}
                  <div className="row mb-3">
                    <div className="col-12">
                      <div className="roulette-section">
                        <h3>Place Your Bet</h3>
                        <div className="gambling-box">
                          {!isModalopen && <RouletteSpinner />}
                        </div>
                      </div>
                    </div>
                  </div>
                </HoverAudio>


                {/* Row 3: Charts for Bitcoin Interest & Investments */}
                <div className="row">
                  <div className="col-12">
                    <div className="chart-container">
                      <div className="chart-placeholder">
                        <h3>Bitcoin Interest & Investments</h3>
                        {/* Insert charts for bitcoin account interest and bitcoin investments */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UnstableDashboard;
