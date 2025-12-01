// TimelineSection.jsx
import React from 'react'
import './css/TimelineSection.css'

function getAllTimelineItems(education, experience, achievements) {
    const edu = education.map(e => ({
        type: "education",
        date: e.endDate || e.startDate,
        ...e
    }));
    const exp = experience.map(e => ({
        type: "experience",
        date: e.endDate || e.startDate,
        ...e
    }));
    const ach = achievements.map(a => ({
        type: "achievement",
        date: a.date,
        ...a
    }));
    return [...edu, ...exp, ...ach].sort((a, b) => b.date.localeCompare(a.date));
}

export default function TimelineSection({ education, experience, achievements }) {
    const formatDate = (dateString) => {
        if (!dateString) return ''
        const date = new Date(dateString + '-01')
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
    }
    const allItems = getAllTimelineItems(education, experience, achievements);

    return (
        <div className="timeline-section">
            <div className="timeline-container">
                <h2 className="timeline-title">Education & Experience</h2>

                <div className="timeline">
                    {allItems && allItems.map((item, idx) => (
                        <div key={`${item.type}-${idx}`} className="timeline-item">
                            {/* Render basato sul type */}
                            {item.type === 'education' && (
                                <>
                                    <div className="timeline-marker education">🎓</div>
                                    <div className="timeline-content">
                                        <div className="timeline-date">
                                            {formatDate(item.startDate)} - {formatDate(item.endDate)}
                                        </div>
                                        <h3>{item.degree}</h3>
                                        <p className="institution">{item.institution}</p>
                                        {item.specialization && (
                                            <p className="detail"><strong>Specialization:</strong> {item.specialization}</p>
                                        )}
                                        {item.awards && item.awards.length > 0 && (
                                            <div className="awards">
                                                {item.awards.map((award, aIdx) => (
                                                    <p key={aIdx} className="award">✓ {award}</p>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            {item.type === 'experience' && (
                                <>
                                    <div className="timeline-marker experience">💼</div>
                                    <div className="timeline-content">
                                        <div className="timeline-date">
                                            {formatDate(item.startDate)} - {formatDate(item.endDate)}
                                        </div>
                                        <h3>{item.position}</h3>
                                        <p className="company">{item.company}</p>
                                        {item.description && <p className="description">{item.description}</p>}
                                        {item.project && (
                                            <p className="project">📌 <strong>Project:</strong> {item.project}</p>
                                        )}
                                    </div>
                                </>
                            )}

                            {item.type === 'achievement' && (
                                <>
                                    <div className="timeline-marker achievement">🏆</div>
                                    <div className="timeline-content">
                                        <div className="timeline-date">{formatDate(item.date)}</div>
                                        <h3>{item.title}</h3>
                                        {item.award && <p className="award-badge">{item.award}</p>}
                                        {item.role && <p className="role">Role: {item.role}</p>}
                                        {item.location && <p className="location">📍 {item.location}</p>}
                                        {item.description && <p className="description">{item.description}</p>}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
