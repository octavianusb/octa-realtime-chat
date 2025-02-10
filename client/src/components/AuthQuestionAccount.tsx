import { Link } from 'react-router-dom';

type AuthQuestionAccountProps = {
    question: string;
    to: string;
    linkTxt: string;
};

const AuthQuestionAccount = ({
    question,
    to,
    linkTxt,
}: AuthQuestionAccountProps) => {
    return (
        <div className="text-center">
            <p className="text-base-content/60">
                {question}{' '}
                <Link to={to} className="link link-primary">{linkTxt}</Link>
            </p>
        </div>
    );
}

export default AuthQuestionAccount;
