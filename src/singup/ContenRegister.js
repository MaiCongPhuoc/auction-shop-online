import React from 'react';
import AccountInfo from './AccountInfo';
import './asset/css/content.css';
import AccountSingupPhone from './AccountSingupPhone';
import AccountSingupInfo from './AccountSingupInfo';
import AccountLocation from './AccountLocation';
import { useState } from 'react';

const ContenRegister = () => {
    return (
        <>
            <div className="base-width main-yield" id="client-content">
                <div className="pages" data-pages-shell>
                    <div data-react-class="onboarder/OnBoarderRouter" data-react-props>
                        <div className="OnBoarder-module__wrapper___3_Izy onboarder">
                            <div className="sorter-wrapper col-6">
                                <AccountInfo />
                            </div>
                            <div className="sorter-wrapper col-6">
                                <AccountSingupPhone />
                                <AccountSingupInfo />
                                <AccountLocation />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContenRegister;
