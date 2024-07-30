import React, {useEffect, useState} from 'react';
import Loading from './Loading';

function Profile() {
    const [profile, setProfile] = useState(null);
    const [topArtists, setTopArtists] = useState([]);
    const [topGenres, setTopGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const accessToken = new URLSearchParams(window.location.search).get('access_token');
    console.log(accessToken);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileResponse = await fetch('https://api.spotify.com/v1/me', {
                    headers: {
                        'Authorization': 'Bearer' + accessToken
                    }
                });
                const profileData = await profileResponse.json();
                setProfile(profileData);

                const artistsResponse = await fetch('https://api.spotify.com/v1/me/top/artists', {
                    headers: {
                        'Authorization': 'Bearer' + accessToken
                    }
                });
                const artistsData = await artistsResponse.json();
                setTopArtists(artistsData.items);

                const genres = artistsData.items.flatMap(artist => artist.genres);
                const uniqueGenres = [...new Set(genres)];
                setTopGenres(uniqueGenres);

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [accessToken]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="profile">
            {profile && (
                <>
                    <h1> Welcome, {profile.display_name}</h1>
                    {profile.images.length > 0 && <img src={profile.images[0].url} alt="Profile" />}
                    <p>Email: {profile.email}</p>
                    <p>Country: {profile.country}</p>
                </>
            )}
            <div className="top-genres">
                <h2>Top Genres</h2>
                <ul>
                    {topGenres.map((genre, index) => (
                        <li key={index}>{genre}</li>
                    ))}
                </ul>
            </div>
            <div className="top-artists">
                <h2>Top Artists</h2>
                <ul>
                    {topArtists.map((artist, index) => (
                        <li key={index}>{artist.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Profile;