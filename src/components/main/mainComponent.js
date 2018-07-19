import React from 'react'
import PropTypes from 'prop-types';
import LoaderComponent from '../partialComponent/loader';
import Slider from "react-slick";

export default class MainComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      currectDate: new Date(),
      daysInMonth: '',
      sortedDaysInMonth: '',
      year: '',
      month: '',
      day: '',
      yearArr: [],
      nameOfMonth: [],
      nameOfDays: [],
      yearToSlide: '',
      activeSlide: '',
      activeSlideMonth: ''
    }
  };

  static propTypes = {
    main: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  componentWillMount() {
    const daysInMonth = this.daysInMonth(this.state.currectDate.getMonth(), this.state.currectDate.getFullYear());
    const year = this.state.currectDate.getFullYear();
    const month = this.state.currectDate.getMonth();
    const day = this.state.currectDate.getDate();


    // DATEPICKER YEAR

    let minYear = year - 10;
    let maxYear = year + 10;
    let yearArr = [];
    for (let i = minYear; i < maxYear; i++) {
      let obj = {};
      obj.id = i;

      yearArr.push(obj)
    }

    const index = yearArr.findIndex(x => x.id === year);

    // DATEPICKER MONTH

    let weekday = new Array(7);
        weekday[0] = "Sun";
        weekday[1] = "Mon";
        weekday[2] = "Tue";
        weekday[3] = "Wed";
        weekday[4] = "Thu";
        weekday[5] = "Fri";
        weekday[6] = "Sat";

    let monthArray = new Array();
        monthArray[0] = "January";
        monthArray[1] = "February";
        monthArray[2] = "March";
        monthArray[3] = "April";
        monthArray[4] = "May";
        monthArray[5] = "June";
        monthArray[6] = "July";
        monthArray[7] = "August";
        monthArray[8] = "September";
        monthArray[9] = "October";
        monthArray[10] = "November";
        monthArray[11] = "December";

    // DAYPICKER DATE

    let arrWeek = [];
    for (let i = 0; i < daysInMonth; i++) {
      let obj = {};
      let newInt = i;
      obj.id = newInt + 1;

      const dayOfWeek = this.daysInWeek(this.state.year || year, (this.state.month + 1) || (month + 1), i);

      obj.weekDay = weekday[dayOfWeek];

      arrWeek.push(obj)
    }

    this.setState({
      loader: true,
      daysInMonth: arrWeek,
      year: year,
      yearArr: yearArr,
      month: month,
      day: day,
      nameOfMonth: monthArray,
      nameOfDays: weekday,
      yearToSlide: index
    });
  }


  daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  daysInWeek = (month, year, day) => {
    return new Date(year, month + 1, day).getDay();
  };


  dayIsClicked = (item) => {
    const month = item.id + 1;
    this.countDates('', item.id);

    this.setState({month: month})
  };

  yearIsClicked = (item) => {
    const year = this.state.yearArr[item.id].id;
    this.countDates(year);

    this.setState({year: year});
  };

  dayInMonthClicked = (day) => {
    this.setState({day: day});
  };


  countDates = (year, month) => {
    const daysInMonth = this.daysInMonth(this.state.month, this.state.year);

    let newArrDay = [];
    for (let i = 0; i < daysInMonth; i++) {
      let obj = {};
      let newInt = i;
      const dayOfWeek = this.daysInWeek(year || this.state.year, (month + 1) || (this.state.month + 1), i);

      obj.id = newInt + 1;
      obj.weekDay = this.state.nameOfDays[dayOfWeek];
      newArrDay.push(obj)
    }
    this.setState({daysInMonth: newArrDay});
  };

  render () {
    return (
      <div>
        {
          this.props.main.isPending ? <LoaderComponent/> :
            <div>

              <div className="right_col" role="main">

                <h1>
                  {this.state.day + '/'}{(this.state.month < 10 ? ('0' + this.state.month) : this.state.month) + '/'}{this.state.year}
                </h1>

                <div className="row tile_count">
                  <div className="date__wrapper-block">
                    <div className="date__month">
                      <div className="date__left-arrow"></div>

                      <Slider {...{
                        dots: false,
                        infinite: true,
                        speed: 500,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        draggable: false,
                        afterChange: current => this.yearIsClicked({ id: current }),
                        initialSlide: this.state.yearToSlide
                      }}>
                        {this.state.yearArr.length && this.state.yearArr.map((item, key) => (
                          <div className='current__year-wrap' key={key}>
                            <h3 className='calendar__date'>{item.id}</h3>
                          </div>
                        ))}
                      </Slider>

                      <div className="date__right-arrow"></div>
                    </div>

                    <div className="date__year">
                      <div className="date__left-arrow"></div>

                      <Slider {...{
                        dots: false,
                        infinite: true,
                        speed: 500,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        draggable: false,
                        afterChange: current => this.dayIsClicked({ id: current }),
                        initialSlide: this.state.month
                      }}>
                        {this.state.nameOfMonth.length && this.state.nameOfMonth.map((item, key) => (
                          <div className='current__year-wrap' key={key}>
                            <h3 className='calendar__date'>{item}</h3>
                          </div>
                        ))}
                      </Slider>

                      <div className="date__right-arrow"></div>
                    </div>
                  </div>

                  <div className="date__picker">
                    <div className="date__picker-wrap">
                      <div className="date__left-arrow"></div>

                      <Slider {...{
                        dots: false,
                        infinite: true,
                        speed: 500,
                        slidesToShow: 7,
                        slidesToScroll: 7,
                        draggable: false,
                        initialSlide: (this.state.day - 1) <= 3 ? (this.state.day - 1) : (this.state.day - 1) - 3
                      }}>
                        {
                          this.props.main.year.length ? this.props.main.year.map((item, key) => (
                              <div
                                className="date__scroll-wrap"
                                onClick={() => this.dayInMonthClicked(item.id)}
                                key={key}
                              >
                                <h3 className={this.state.day === item.id ? "date__scroll-chosen" : "date__scroll"}>
                                  <p className="date__scroll-date">{item.id}</p>
                                  <p className="date__scroll-week">{item.weekDay}</p>
                                </h3>
                              </div>
                            ))
                            :
                            this.state.daysInMonth.length && this.state.daysInMonth.map((item, key) => (
                              <div
                                className="date__scroll-wrap"
                                onClick={() => this.dayInMonthClicked(item.id)}
                                key={key}
                              >
                                <h3 className={this.state.day === item.id ? "date__scroll-chosen" : "date__scroll"}>
                                  <p className="date__scroll-date">{item.id}</p>
                                  <p className="date__scroll-week">{item.weekDay}</p>
                                </h3>
                              </div>
                            ))
                        }
                      </Slider>

                      <div className="date__right-arrow"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
      </div>
    );
  }
}
