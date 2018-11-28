import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';

import generalStyles from './PolicyPropertySetter.css';

const PolicyPropertySetter = ({
  loanHeader,
  textFieldName,
  selectFieldName,
  intervalPeriods,
  validator,
  loansPolicyNamespace,
  loanHeaderNamespace,
  durationDescriptor,
  timeIntervalsUnitsDescriptor,
}) => (
  <Fragment>
    <Row className={generalStyles.label}>
      <Col xs={12}>
        <FormattedMessage id={`${loanHeaderNamespace}.${loanHeader}`} />
      </Col>
    </Row>
    <Row>
      <Col xs={1}>
        <Field
          label=""
          name={`${loansPolicyNamespace}.${textFieldName}.${durationDescriptor}`}
          component={TextField}
          validate={validator}
        />
      </Col>
      <Col xs={2}>
        <FormattedMessage id="ui-circulation.settings.loanPolicy.selectInterval">
          {placeholder => (
            <Field
              label=""
              name={`${loansPolicyNamespace}.${selectFieldName}.${timeIntervalsUnitsDescriptor}`}
              component={Select}
              placeholder={placeholder}
              validate={validator}
            >
              {intervalPeriods}
            </Field>
          )}
        </FormattedMessage>
      </Col>
    </Row>
  </Fragment>
);

PolicyPropertySetter.propTypes = {
  loanHeader: PropTypes.object.isRequired,
  textFieldName: PropTypes.string.isRequired,
  selectFieldName: PropTypes.string.isRequired,
  intervalPeriods: PropTypes.arrayOf(PropTypes.string).isRequired,
  validator: PropTypes.func.isRequired,
  loansPolicyNamespace: PropTypes.string,
  durationDescriptor: PropTypes.string,
  timeIntervalsUnitsDescriptor: PropTypes.string,
  loanHeaderNamespace: PropTypes.string,
};

// Default string identifiers to set namespaces
PolicyPropertySetter.defaultProps = {
  loansPolicyNamespace: 'loansPolicy',
  durationDescriptor: 'duration',
  timeIntervalsUnitsDescriptor: 'intervalId',
  loanHeaderNamespace: 'ui-circulation.settings.loanPolicy',
};

export default PolicyPropertySetter;