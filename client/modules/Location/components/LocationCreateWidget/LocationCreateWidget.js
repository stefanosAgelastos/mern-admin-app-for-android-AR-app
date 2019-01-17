import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './LocationCreateWidget.css';

export class LocationCreateWidget extends Component {
  addLocation = () => {
    const authorRef = this.refs.author;
    const titleRef = this.refs.title;
    const lonRef = this.refs.lon;
    const latRef = this.refs.lat;
    const imgTitle1Ref = this.refs.imgTitle1;
    const imgUrl1Ref = this.refs.imgUrl1;
    const imgTitle2Ref = this.refs.imgTitle2;
    const imgUrl2Ref = this.refs.imgUrl2;
    const imgTitle3Ref = this.refs.imgTitle3;
    const imgUrl3Ref = this.refs.imgUrl3;
    if (authorRef.value && titleRef.value && lonRef.value && latRef.value && imgTitle1Ref.value &&
    imgTitle2Ref.value && imgTitle3Ref.value && imgUrl1Ref.value && imgUrl2Ref.value && imgUrl3Ref.value) {
      this.props.addLocation(authorRef.value, titleRef.value, lonRef.value, latRef.value, imgTitle1Ref.value, imgUrl1Ref.value,
      imgTitle2Ref.value, imgUrl2Ref.value, imgTitle3Ref.value, imgUrl3Ref.value);
      authorRef.value = titleRef.value = lonRef.value = latRef.value = imgTitle1Ref.value = '';
      imgTitle2Ref.value = imgTitle3Ref.value = imgUrl1Ref.value = imgUrl2Ref.value = imgUrl3Ref.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddLocation ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewLocation" /></h2>
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="author" />
          <input placeholder={this.props.intl.messages.locationTitle} className={styles['form-field']} ref="title" />
          <input placeholder={this.props.intl.messages.longitude} className={styles['form-field']} ref="lon" />
          <input placeholder={this.props.intl.messages.latitude} className={styles['form-field']} ref="lat" />
          <h2 className={styles['form-title']}><FormattedMessage id="firstImage" /></h2>
          <input placeholder={this.props.intl.messages.imageTitle} className={styles['form-field']} ref="imgTitle1" />
          <input placeholder={this.props.intl.messages.imageUrl} className={styles['form-field']} ref="imgUrl1" />
          <h2 className={styles['form-title']}><FormattedMessage id="secondImage" /></h2>
          <input placeholder={this.props.intl.messages.imageTitle} className={styles['form-field']} ref="imgTitle2" />
          <input placeholder={this.props.intl.messages.imageUrl} className={styles['form-field']} ref="imgUrl2" />
          <h2 className={styles['form-title']}><FormattedMessage id="thirdImage" /></h2>
          <input placeholder={this.props.intl.messages.imageTitle} className={styles['form-field']} ref="imgTitle3" />
          <input placeholder={this.props.intl.messages.imageUrl} className={styles['form-field']} ref="imgUrl3" />
          <a className={styles['location-submit-button']} href="#" onClick={this.addLocation}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

LocationCreateWidget.propTypes = {
  addLocation: PropTypes.func.isRequired,
  showAddLocation: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(LocationCreateWidget);
