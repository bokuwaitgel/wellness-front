import React, { useState } from 'react';
import PropTypes from 'prop-types';
import rightArrow from '../../assets/arrow-right.svg';
import leftArrow from '../../assets/arrow-left.svg';
import { toast } from 'react-toastify';

export const Right = (props) => {
  const { value, onChange, pages, canNext, resData } = props || {};
  const [scrollQuestionId, setScrollQuestionId] = useState('#');
  return (
    <>
      <div className="font-title-m OCcolor text-center lg:text-left">
        Та бүх асуултанд хариулаад дараагийн хуудасруу шилжих боломжтой.
      </div>
      <div className=" mt-10 flex place-content-center lg:place-content-start">
        {value > 3 ? (
          <button
            className="arrow-cont center"
            onClick={() => {
              if (value > 2) onChange(value - 1);
            }}>
            <img src={leftArrow} className="w-8" />
          </button>
        ) : null}

        <a
          href={`${scrollQuestionId}`}
          className={`button-next center ${canNext ? 'bg-[#1A65EF]' : 'bg-[#9CA5B0]'}`}
          onClick={() => {
            if (!canNext) {
              toast.warn('Та бүх асуултанд хариулаад дараагийн хуудасруу шилжих боломжтой.');
              for (let i = 0; i < resData[value].length; i++) {
                if (resData[value][i].res === undefined) {
                  setScrollQuestionId('#' + resData[value][i].questionId);
                  break;
                } else if (resData[value][i].res.length < 1) {
                  setScrollQuestionId('#' + resData[value][i].questionId);
                  break;
                }
              }
            } else {
              setScrollQuestionId('#');
            }
            if (value < pages && canNext) {
              onChange(value + 1);
            }
          }}>
          Дараагийн хуудас
          <img src={rightArrow} className="w-8" />
        </a>
      </div>
    </>
  );
};

Right.propTypes = {
  value: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};
