import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './LocationCreateWidget.css';

export class LocationCreateWidget extends Component {
  addLocation = () => {
    const nameRef = this.refs.name;
    const titleRef = this.refs.title;
    const contentRef = this.refs.content;
    if (nameRef.value && titleRef.value && contentRef.value) {
      this.props.addLocation(nameRef.value, titleRef.value, contentRef.value);
      nameRef.value = titleRef.value = contentRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddLocation ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewLocation" /></h2>
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="name" />
          <input placeholder={this.props.intl.messages.locationTitle} className={styles['form-field']} ref="title" />
          <textarea placeholder={this.props.intl.messages.locationContent} className={styles['form-field']} ref="content" />
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
