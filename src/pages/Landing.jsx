import React, { useEffect } from 'react';
import { Element } from 'react-scroll';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OfferBlock from '../components/OfferBlockHero/OfferBlock.jsx';
import Features from '../components/Features/Features.jsx';
import ForWhom from '../components/ForWhomBlock/ForWhom.jsx';
import CompetitiveAdvantage from '../components/CompetitiveAdvantage/CompetitiveAdvantage.jsx';
;

function Landing() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home/WithoutRegistration');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <Element name="product"><OfferBlock /></Element>
      <Element name="features"><Features /></Element>
      <Element name="audience"><ForWhom /></Element>
      <Element name="compare"><CompetitiveAdvantage /></Element>
    </div>
  );
}

export default Landing;
