import React, { useState } from "react";
import { useStore, actions } from "../../../context/store";
const LotType = () => {
    const [state, dispatch] = useStore();

    const lotTypes = state.lotTypes;
    const type = state.type;

    return (
        <>
            <div className="filter-item small cell small-12 medium-7">
                <div className="filter-title">SẢN PHẨM</div>
                <div className="tab-sel-wrapper grid-x text-center">
                    {
                        lotTypes.map(lotType => (
                            <div className="tab-item left-end cell small-4"
                                key={lotType}
                                onClick={() => {
                                    dispatch(actions.setType(lotType))
                                }}
                                style={type === lotType ? { color: '#fff', background: '#ff523d', borderRadius: '50px 50px 50px 50px' } : {}}
                            >
                                <div className="i-label">{lotType}</div>
                            </div>
                        ))

                    }
                </div>
            </div>
            {/* <ContentAll /> */}
        </>
    );
}

export default LotType;