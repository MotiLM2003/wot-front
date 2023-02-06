import Image from 'next/image';
import React from 'react';
import Layout from '../shared/Layout';
import aboutUs from '../../images/about-us-hero.png';
import aboutUs2 from '../../images/about-us-2.svg';
import mail from '../../images/mail.svg';
import mail2 from '../../images/mail-service.svg';
import website from '../../images/website.svg';
import funding from '../../images/funding.svg';
import telephonyService from '../../images/telephony-service.svg';
const aboutUS = () => {
    return ( <
        Layout >
        <
        div className = 'default-container  flex  flex-col bg-shades-50' >
        <
        div className = 'flex justify-center bg-gradient-to-br from-blue-200  p-3 ' >
        <
        div className = 'grow text-black  flex items-center justify-center' >
        <
        h1 className = 'text-black flex items-center' >
        WELCOME TO THE <
        br / > WORLD OF TZEDKA <
        /h1> <
        /div> <
        div className = 'grow' >
        <
        Image src = { aboutUs }
        width = { 460 }
        height = { 507 }
        layout = 'responsive' / >


        <
        /div> <
        /div> <
        div className = 'mt-5 mb-5 flex' >
        <
        div className = 'basis-1/2 flex flex-col items-center justify-center p-3' >
        <
        h1 className = 'mb-3' > About Us < /h1> <
        p className = 'mb-4 font-bold text-left' >
        One of our goals is to enable any individual or organization to raise money
        for their specific cause. <
        /p>
        We help individuals from Eretz Yisroel coming to the United States to raise money
        for themselves or someone
        else, families in Eretz Yisrael and the United States going through a tragedy, and organizations / Yeshivas around the world. <
        p className = 'mt-4' >
        <
        span className = 'font-bold' >
        We offer all the necessary resources and services <
        /span> &
        nbsp; needed to fundraise
        for any cause efficiently and successfully. <
        /p> <
        /div> <
        div className = 'grow' >
        <
        Image src = { aboutUs2 }
        width = { 507 }
        height = { 506 }
        layout = 'responsive' /
        >
        <
        /div> <
        /div> <
        div className = 'flex flex-col justify-center items-center mt-5 mb-20' >
        <
        h1 className = 'mb-10' > Services < /h1> <
        div className = 'flex flex-col' >
        <
        div className = 'flex gap-12' >
        <
        div className = 'bg-white p-6 shadow rounded-xl flex  flex-col justify-center items-center' >
        <
        Image src = { mail }
        width = { 70 }
        height = { 55 }
        layout = 'fixed' / >

        <
        div className = 'mt-2 min-h-[30px]' >
        <
        p > Mailbox Services < /p> <
        /div> <
        /div> <
        div className = 'bg-white p-6 shadow rounded-xl flex  flex-col justify-center items-center' >
        <
        Image src = { mail2 }
        width = { 64 }
        height = { 68 }
        layout = 'fixed' / >

        <
        div className = 'mt-2 min-h-[30px]' >
        <
        p > Personal Website < /p> <
        /div> <
        /div> <
        div className = 'bg-white p-6 shadow rounded-xl flex  flex-col justify-center items-center' >
        <
        Image src = { website }
        width = { 80 }
        height = { 75 }
        layout = 'fixed' / >
        <
        div className = 'flex flex-col items-center' >
        <
        p > Personal Website < /p> <
        p > Building Service < /p> <
        /div> <
        /div> <
        /div> <
        div className = 'flex justify-center gap-10 mt-8' >
        <
        div className = 'bg-white p-6 shadow rounded-xl flex  flex-col justify-center items-center' >
        <
        Image src = { funding }
        width = { 64 }
        height = { 68 }
        layout = 'fixed' / >

        <
        div className = 'flex flex-col items-center' >
        <
        p > Mass fundraising < /p> <
        p > Campaign building service < /p> <
        /div> <
        /div> <
        div className = 'bg-white p-6 shadow rounded-xl flex  flex-col justify-center items-center' >
        <
        Image src = { telephonyService }
        width = { 64 }
        height = { 68 }
        layout = 'fixed' /
        >

        <
        div >
        <
        p > Telephony Service Website < /p> <
        /div> <
        /div> <
        /div> <
        /div> <
        /div> <
        /div> <
        /Layout>
    );
};

export default aboutUS;