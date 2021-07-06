const util = require('util');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMailAsync = util.promisify(sgMail.send)
    .bind(sgMail);

/**
 * Action method.
 *
 * @param {object} params - A map of all the parameters passed from the flow.
 * @param {object} options - The additional options provided from the flow
 *	 engine.
 * @param {object} options.pluginConfig - The service configuration for this
 *	 plugin from API Builder config.pluginConfig['api-builder-plugin-pluginName']
 * @param {object} options.logger - The API Builder logger which can be used
 *	 to log messages to the console. When run in unit-tests, the messages are
 *	 not logged.  If you wish to test logging, you will need to create a
 *	 mocked logger (e.g. using `simple-mock`) and override in
 *	 `MockRuntime.loadPlugin`.  For more information about the logger, see:
 *	 https://docs.axway.com/bundle/API_Builder_4x_allOS_en/page/logging.html
 * @param {*} [options.pluginContext] - The data provided by passing the
 *	 context to `sdk.load(file, actions, { pluginContext })` in `getPlugin`
 *	 in `index.js`.
 * @return {*} The response value (resolves to "next" output, or if the method
 *	 does not define "next", the first defined output).
 */
async function sendEmail(params, options) {
	const { to, from, subject, html, cc, bcc, replyTo } = params;
	const { logger } = options;
	if (!to) {
		throw new Error('Missing required parameter: to');
	}
  if (!from) {
		throw new Error('Missing required parameter: from');
	}
  if (!subject) {
		throw new Error('Missing required parameter: subject');
	}
  if (!html) {
		throw new Error('Missing required parameter: html');
	}

  const msg = {
    to,
    from,
    subject,
    html,
  }

  if(cc) {
    msg.cc = cc;
  }
  if(bcc) {
    msg.bcc = bcc;
  }
  if(replyTo) {
    msg.replyTo = replyTo;
  }

  try {
    const mailResponse = await sendMailAsync(msg);
  } catch(error) {
    logger.error(error);
    if (error.response) {
      throw new Error(error.response.body)
    } else {
      throw new Error('Failed to send email')
    }

  }

  return {success: true}
}

module.exports = {
	sendEmail
};
