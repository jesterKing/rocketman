PHABRICATOR_ROOT_URL =  'https://developer.blender.org'

class Script {

    constructor() {
    }

    /**
     * @params {object} request
     */
    process_incoming_request({ request }) {

        // Regexes for finding different Phabricator objects
        var maniphestRegex = /\b(T\d+):/ig;
        var differentialRegex = /\b(D\d+):/ig;
        var diffusionRegex = /\b(R(?:\d+:|[a-z]{1,10})[0-9a-f]{10,40}):/ig;

        var text = request.content.storyText;

        var maniphestMatch = maniphestRegex.exec(text);
        if (maniphestMatch) {
            var replaceText = `[${maniphestMatch[1]}](${PHABRICATOR_ROOT_URL + maniphestMatch[1]})`
            text = text.replace(maniphestMatch[1], replaceText);
        }

        var differentialMatch = differentialRegex.exec(text);
        if (differentialMatch) {
            var replaceText = `[${differentialMatch[1]}](${PHABRICATOR_ROOT_URL + differentialMatch[1]})`
            text = text.replace(differentialMatch[1], replaceText);
        }

        var diffusionMatch = diffusionRegex.exec(text);
        if (diffusionMatch) {
            var replaceText = `[${diffusionMatch[1]}](${PHABRICATOR_ROOT_URL + diffusionMatch[1]})`
            text = text.replace(diffusionMatch[1], replaceText);
        }

        if (!text) {
            return;
        }

        return {
            content: {
                text: text
            }
        };
    }
}
