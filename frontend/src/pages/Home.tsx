import styled from "styled-components";

const Home = (): JSX.Element => {
    return (
        <Wrapper>
            <h1>Hem</h1>
            <p>
                Välkommen till Skurups Taekwon-Do. Den lokala klubben för både
                dig och dina barn i centrala Skurup. Vi på Skurups Taekwon-Do
                tränar den stil som heter ITF. ITF är ingen fullkontakt-sport
                och vi använder både händer och ben. Under våra träningar lär vi
                ut disciplin och respekt som är en viktig del av vår sport.
                Taekwon-Do erbjuder:
            </p>

            <ul>
                <li>Gemenskap</li>
                <li>En rolig och effektiv motionsform</li>
                <li>Realistisk självförsvarsträning</li>
                <li>Kampsport</li>
                <li>Tävlingar</li>
                <li>Träningsläger</li>
                <li>Utbildningar</li>
                <li>Graderingar</li>
            </ul>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    ul {
        padding-top: 1rem;
    }
`;

export default Home;
