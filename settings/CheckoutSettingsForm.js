import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { stripesShape } from '@folio/stripes-core/src/Stripes';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Button from '@folio/stripes-components/lib/Button';
import Checkbox from '@folio/stripes-components/lib/Checkbox';
import stripesForm from '@folio/stripes-form';
import Pane from '@folio/stripes-components/lib/Pane';
import { Field, FieldArray } from 'redux-form';
import Select from '@folio/stripes-components/lib/Select';
import { patronIdentifierTypes } from '../constants';
import css from './CheckoutSettingsForm.css';

class CheckoutSettingsForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.renderList = this.renderList.bind(this);
    this.getLastMenu = this.getLastMenu.bind(this);
  }

  onSave(data) {
    const { idents, audioAlertsEnabled } = data;
    const values = idents.reduce((vals, ident, index) => {
      if (ident) vals.push(patronIdentifierTypes[index].key);
      return vals;
    }, []);

    const otherSettings = JSON.stringify({
      audioAlertsEnabled: audioAlertsEnabled === 'true',
      prefPatronIdentifier: values.join(','),
    });

    this.props.onSubmit({ other_settings: otherSettings });
  }

  getLastMenu() {
    const { pristine, submitting } = this.props;
    return (
      <Button type="submit" disabled={(pristine || submitting)} id="clickable-savescanid">
        <FormattedMessage id="ui-circulation.settings.checkout.save" />
      </Button>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderList({ fields, meta }) {
    if (!fields.length) return (<div />);

    const items = patronIdentifierTypes.map((iden, index) => (
      <Row key={`row-${index}`}>
        <Col xs={12}>
          <Field
            component={Checkbox}
            id={`${iden.queryKey}-checkbox`}
            data-checked={fields.get(index)}
            label={iden.label}
            key={`item-${index}`}
            name={`idents[${index}]`}
          />
        </Col>
      </Row>
    ));

    return (
      <div>
        <p className={css.label}>
          <FormattedMessage id="ui-circulation.settings.checkout.patronIds" />
        </p>
        {meta.error && <div className={css.error}>{meta.error}</div>}
        {items}
      </div>
    );
  }

  render() {
    const { handleSubmit, label } = this.props;

    return (
      <form id="checkout-form" onSubmit={handleSubmit(this.onSave)}>
        <Pane defaultWidth="fill" fluidContentWidth paneTitle={label} lastMenu={this.getLastMenu()}>
          <FieldArray name="idents" component={this.renderList} />
          <br />
          <Row>
            <Col xs={12}>
              <Field
                label={this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.checkout.audioAlerts' })}
                name="audioAlertsEnabled"
                component={Select}
                dataOptions={[
                  {
                    label: this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.checkout.no' }),
                    value: false,
                  },
                  {
                    label: this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.checkout.yes' }),
                    value: true,
                  },
                ]}
              />
            </Col>
          </Row>
        </Pane>
      </form>
    );
  }
}

CheckoutSettingsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  label: PropTypes.string,
  stripes: stripesShape.isRequired,
};

export default stripesForm({
  form: 'checkoutForm',
  navigationCheck: true,
  enableReinitialize: true,
})(CheckoutSettingsForm);