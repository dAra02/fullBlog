import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Error } from '../error/error';
import { selectorUserRole } from '../../selectors';
import { checkAccess } from '../../utils';
import { ERROR, PROP_TYPE } from '../../constants';

export const PrivateContent = ({ children, access, serverError = null }) => {
	const userRole = useSelector(selectorUserRole);

	const accessError = checkAccess(access, userRole) ? null : ERROR.ACCESS_DENIED;

	const error = serverError || accessError;

	return error ? <Error error={error} /> : children;
};

PrivateContent.propTypes = {
	children: PropTypes.node.isRequired,
	access: PropTypes.arrayOf(PROP_TYPE.ROLE_ID).isRequired,
	serverError: PROP_TYPE.ERROR,
};
