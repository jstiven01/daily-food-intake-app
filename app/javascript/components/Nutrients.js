import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { getNutrients } from '../redux/nutrients/actions';
import 'react-circular-progressbar/dist/styles.css';

const Nutrients = ({ nutrientsData, getNutrients }) => {
  useEffect(() => {
    getNutrients();
  }, []);

  const goalsNutrients = {
    Protein: 50,
    Fat: 65,
    Carbs: 300,
  };

  const jsxNutrients = nutrientsData.map(nutrient => {
    const goal = goalsNutrients[nutrient.name];
    return (
      <div key={nutrient.id} className="nutrient">
        <Link to={`/nutrient/${nutrient.id}/${nutrient.name}/measurements`}>
          <div className="d-flex">
            <div className="align-self-center">
              <div className={`${nutrient.name}-img`} />
            </div>

            <div className="description">
              <p><strong>{nutrient.name}</strong></p>
              <p>
                total:
                { nutrient.date_progress.substring(0, 10)
              === new Date().toISOString().substring(0, 10)
                  ? nutrient.total_nutrient : 0}
                {' '}
                <span> </span>
                {nutrient.units}
              </p>


            </div>
            <div className="goals description flex-grow-1 text-right mr-4">
              <p><strong>Goal</strong></p>
              <p>
                {goal}
                {' '}
                grams
              </p>


            </div>
          </div>


        </Link>

      </div>
    );
  });


  let totalProtein;
  let totalCarbs;
  let totalFat;
  if (nutrientsData.length > 0) {
    const protein = nutrientsData.filter(nutrient => nutrient.name === 'Protein'
    && nutrient.date_progress.substring(0, 10) === new Date().toISOString().substring(0, 10))[0];
    if (!protein) {
      totalProtein = 0;
    } else {
      totalProtein = protein.total_nutrient;
    }
    const carbs = nutrientsData.filter(nutrient => nutrient.name === 'Carbs'
    && nutrient.date_progress.substring(0, 10) === new Date().toISOString().substring(0, 10))[0];
    if (!carbs) {
      totalCarbs = 0;
    } else {
      totalCarbs = carbs.total_nutrient;
    }
    const fat = nutrientsData.filter(nutrient => nutrient.name === 'Fat'
    && nutrient.date_progress.substring(0, 10) === new Date().toISOString().substring(0, 10))[0];
    if (!fat) {
      totalFat = 0;
    } else {
      totalFat = fat.total_nutrient;
    }
  }

  const percentageProtein = Math.round((totalProtein / goalsNutrients.Protein) * 100);
  const percentageCarbs = Math.round((totalCarbs / goalsNutrients.Carbs) * 100);
  const percentageFat = Math.round((totalFat / goalsNutrients.Fat) * 100);
  const today = new Date();
  return (

    <div className="col-12 p-0">
      <div className="col-12 main-bk-color color-text nav-top-app text-center">
        <h2 className="top-title">My Nutrients</h2>
      </div>
      <div className="col-12 section-statistics">
        <div className="col-12 date-main text-center pt-3">
          <span className="main-size-date">
            {new Intl.DateTimeFormat('en-GB', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
            }).format(today)}
          </span>

        </div>
        <div className="d-flex mx-4">
          <div className="d-flex flex-column text-center">
            <CircularProgressbar
              className="circle-progress align-self-center"
              value={percentageProtein}
              text={`${percentageProtein}%`}
              styles={buildStyles({
                textColor: '#8395A5',
                pathColor: '#ADDC91',
                trailColor: '#E8FCFF',
              })}
            />
            <span className="span-name-statistics">Protein</span>
          </div>
          <div className="d-flex flex-column text-center">
            <CircularProgressbar
              className="circle-progress align-self-center"
              value={percentageFat}
              text={`${percentageFat}%`}
              styles={buildStyles({
                textColor: '#8395A5',
                pathColor: '#ADDC91',
                trailColor: '#E8FCFF',
              })}
            />
            <span className="span-name-statistics">Fat</span>
          </div>
          <div className="d-flex flex-column text-center">
            <CircularProgressbar
              className="circle-progress align-self-center"
              value={percentageCarbs}
              text={`${percentageCarbs}%`}
              styles={buildStyles({
                textColor: '#8395A5',
                pathColor: '#ADDC91',
                trailColor: '#E8FCFF',
              })}
            />
            <span className="span-name-statistics">Carbs</span>
          </div>

        </div>

      </div>
      <div className="col-12 nutrients-global">
        {jsxNutrients}
      </div>
    </div>

  );
};

Nutrients.propTypes = {
  nutrientsData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    units: PropTypes.string,
  })).isRequired,
  getNutrients: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  nutrientsData: state.nutrients.nutrients,
});

const mapDispatchToProps = dispatch => ({
  getNutrients: () => dispatch(getNutrients()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nutrients);
